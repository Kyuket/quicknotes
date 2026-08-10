from django.db import models
from django.db.models.functions import Now

class Note(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    date = models.DateTimeField(db_default=Now())

    def __str__(self):
        return self.title

    def __repr__(self):
        return self.__str__()