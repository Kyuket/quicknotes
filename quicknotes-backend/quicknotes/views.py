from django.shortcuts import redirect
from rest_framework import status
from .models import Note, Collection
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from quicknotes.serializers import CollectionWithNotesSerializer, NoteSerializer, CollectionSerializer, UserSerializer
# from django.db import connection, reset_queries
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

def home(request):
    return redirect('notes')

@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    user: User = serializer.save()  # type: ignore

    refresh = RefreshToken.for_user(user)
    access = refresh.access_token

    return Response(
        {
            "user": UserSerializer(user).data,
            "refresh": str(refresh),
            "access": str(access)
        },
        status=status.HTTP_201_CREATED
    )


class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def get_queryset(self):
        queryset = super().get_queryset().filter(user=self.request.user).select_related("collection")
        collection_id = self.request.query_params.get("collection_id")
        if collection_id:
            queryset = queryset.filter(collection_id=collection_id)
        return queryset.order_by("id")

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class CollectionViewSet(ModelViewSet):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action == "notes":
            queryset = queryset.prefetch_related("notes")
        return queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset()) # Keep an eye on the filters..
        serializer = self.get_serializer(queryset, many=True)
        return Response({"data": serializer.data})
  
    def retrieve(self, request, *args, **kwargs): 
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response({"data": serializer.data})

    @action(detail=True)
    def notes(self, request, pk=None):
        instance = self.get_object()
        serializer = CollectionWithNotesSerializer(instance)
        return Response({"data": serializer.data})