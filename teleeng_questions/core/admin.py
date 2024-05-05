from django.contrib import admin
from orderable.admin import OrderableAdmin, OrderableTabularInline
from .models import Poll, Question, PollQuestion, Answer
from .models.poll import PollResponse, PollResponseAnswer


class PollQuestionInline(OrderableTabularInline):
    model = PollQuestion
    fields = ("question",)
    extra = 5


class AnswerInline(OrderableTabularInline):
    model = Answer
    fields = ("text",)
    extra = 5


@admin.register(Poll)
class PollAdmin(OrderableAdmin):
    inlines = [PollQuestionInline]
    list_display = (
        "id",
        "title",
    )


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [AnswerInline]


class DetailedResponseInline(admin.TabularInline):
    model = PollResponseAnswer
    fields = ("question_text", "answer_display")
    readonly_fields = ("question_text", "answer_display")
    extra = 0
    can_delete = False

    @admin.display(description="Вопрос")
    def question_text(self, instance):
        return instance.question.text

    @admin.display(description="Ответ")
    def answer_display(self, instance):
        if instance.answer:
            return instance.answer.text
        return instance.answer_text


@admin.register(PollResponse)
class PollResponseAdmin(admin.ModelAdmin):
    list_display = ("poll", "user_tg_id", "created_at")
    inlines = [DetailedResponseInline]
    readonly_fields = ("poll", "user_tg_id", "created_at")

    def has_add_permission(self, request, obj=None):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
