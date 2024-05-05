import os
import django
from django.shortcuts import get_object_or_404
from asgiref.sync import sync_to_async
from django.db import transaction
from telegram import Update, ReplyKeyboardMarkup, ReplyKeyboardRemove
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    filters,
    ConversationHandler,
)

from teleeng_questions.core.models import (
    Poll,
    PollResponse,
    PollResponseAnswer,
)

#  Инициализация Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings.local")
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()

# Энам для состояний
ASKING, ANSWERING = range(2)


async def start_poll(update: Update, context):
    args = context.args
    if args:
        poll_id = args[0]
        poll = await sync_to_async(get_object_or_404)(Poll, pk=poll_id)
        with transaction.atomic():
            poll_response = await sync_to_async(PollResponse.objects.create)(
                poll=poll, user_tg_id=str(update.effective_user.id)
            )
            questions = await sync_to_async(list)(poll.poll_questions.all())
            poll_response_answers = [
                PollResponseAnswer(
                    poll_response=poll_response, question=question.question
                )
                for question in questions
            ]
            await sync_to_async(PollResponseAnswer.objects.bulk_create)(
                poll_response_answers
            )
        context.user_data["questions"] = questions
        context.user_data["poll_response"] = poll_response
        context.user_data["current_question_index"] = 0
        return await ask_question(update, context)
    else:
        await update.message.reply_text(
            "Необходимо указать ID опроса в аргументах команды /start."
        )
        return ConversationHandler.END


async def ask_question(update: Update, context):
    questions = context.user_data["questions"]
    question_index = context.user_data["current_question_index"]
    if question_index < len(questions):
        question = questions[question_index]
        context.user_data["current_question"] = question

        if question.is_open:
            await update.message.reply_text(
                f"Вопрос {question_index + 1}: {question.text}"
            )
            return ANSWERING
        else:
            options = [[answer.text] for answer in question.answers.all()]
            keyboard = ReplyKeyboardMarkup(
                options, one_time_keyboard=True, resize_keyboard=True
            )
            await update.message.reply_text(
                f"Вопрос {question_index + 1}: {question.text}", reply_markup=keyboard
            )
            return ANSWERING
    else:
        await update.message.reply_text(
            "Опрос завершен. Спасибо за участие!", reply_markup=ReplyKeyboardRemove()
        )
        return ConversationHandler.END


async def handle_response(update: Update, context):
    user_response = update.message.text
    question = context.user_data["current_question"]
    if question.is_open:
        await save_response(update, context, user_response)
    else:
        valid_answers = [answer.text for answer in question.answers.all()]
        if user_response in valid_answers:
            await save_response(update, context, user_response)
        else:
            await update.message.reply_text(
                "Пожалуйста, выберите один из предложенных вариантов."
            )
            return ANSWERING


async def save_response(update: Update, context, user_response):
    poll_response = context.user_data["poll_response"]
    question = context.user_data["current_question"]

    poll_response_answer, created = await sync_to_async(
        PollResponseAnswer.objects.get_or_create
    )(
        poll_response=poll_response,
        question=question.question,
        defaults={"answer_text": user_response},
    )
    if not created:
        poll_response_answer.answer_text = user_response
        await sync_to_async(poll_response_answer.save)()

    context.user_data["current_question_index"] += 1
    await ask_question(update, context)


def main():
    application = (
        Application.builder()
        .token("7103308182:AAFnn1KDH5mLTfHV127c22Xt9MmtIvf-Mc0")
        .build()
    )
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler("start", start_poll)],
        states={
            ASKING: [MessageHandler(filters.TEXT & (~filters.COMMAND), ask_question)],
            ANSWERING: [
                MessageHandler(filters.TEXT & (~filters.COMMAND), handle_response)
            ],
        },
        fallbacks=[],
        allow_reentry=True,
    )
    application.add_handler(conv_handler)
    application.run_polling()


if __name__ == "__main__":
    main()
