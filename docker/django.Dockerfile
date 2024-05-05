FROM teleeng_questions/django_base

RUN chmod +x /start

ENTRYPOINT ["/start"]
