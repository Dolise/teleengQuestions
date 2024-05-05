from django.db import models
from orderable.models import Orderable


class Poll(models.Model):
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Question(models.Model):
    text = models.CharField(max_length=255)

    @property
    def is_open(self):
        return not self.answers.exists()

    def __str__(self):
        return self.text


class PollQuestion(Orderable):
    poll = models.ForeignKey(
        Poll, related_name="poll_questions", on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    @property
    def text(self):
        return self.question.text

    @property
    def is_open(self):
        return self.question.is_open

    @property
    def answers(self):
        return self.question.answers

    class Meta(Orderable.Meta):
        unique_together = ("poll", "question")

    def __str__(self):
        return f"{self.poll.title} - {self.question.text}"


class Answer(Orderable):
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)

    class Meta(Orderable.Meta):
        pass

    def __str__(self):
        return self.text


class PollResponse(models.Model):
    poll = models.ForeignKey(Poll, on_delete=models.CASCADE, related_name="responses")
    user_tg_id = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response by {self.user_tg_id} for {self.poll.title}"


class PollResponseAnswer(models.Model):
    poll_response = models.ForeignKey(
        PollResponse, related_name="detailed_responses", on_delete=models.CASCADE
    )
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    answer_text = models.TextField(blank=True, null=True)
    answer = models.ForeignKey(Answer, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"Response Answer to {self.question.text} by {self.poll_response.user_tg_id}"
