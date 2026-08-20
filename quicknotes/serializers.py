from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from quicknotes.models import Note, Collection
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {
            "password": { "write_only": True },
            "id": { "read_only": True }
        }

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data.get("username"),
            email=validated_data.get("email"),
            password=validated_data.get("password"),
        )
    

class CollectionSerializer(ModelSerializer):

    class Meta:
        model = Collection
        fields = "__all__"
        extra_kwargs = {
            "user": {"read_only": True}
        }

class NoteSerializer(ModelSerializer):
    collection_data = CollectionSerializer(source="collection", read_only=True)

    class Meta:
        model = Note
        fields = "__all__"
        extra_kwargs = {
                "user": {"read_only": True}
            }

    def validate_collection(self, collection):
        request = self.context.get("request")
        if collection is None:
            return collection
        
        if request and collection.user != request.user:
            raise serializers.ValidationError("You do not own this collection")
        return collection

class CollectionWithNotesSerializer(ModelSerializer):
    notes = NoteSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = "__all__"
        extra_kwargs = {
                "user": {"read_only": True}
            }