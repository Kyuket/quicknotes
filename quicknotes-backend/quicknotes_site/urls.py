from django.urls import path
from quicknotes_site import views

urlpatterns = [
    path('', views.notes, name='notes'),
    path('add/', views.add, name='add'),
    path('<int:note_id>/', views.note, name='note'),
    path('<int:note_id>/edit/', views.edit, name='edit'),
    path('<int:note_id>/delete/', views.delete, name='delete'),
]
