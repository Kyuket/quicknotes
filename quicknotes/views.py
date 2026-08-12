from django.http import JsonResponse
from django.shortcuts import redirect
from .models import Note

def home(request):
    return redirect('notes')

def api_notes(request):
    data = list(Note.objects.values())
    return JsonResponse({'notes': data})