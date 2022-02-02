from utils.marshmallow import ma

class EventSchema(ma.Schema):
    class Meta:
        fields = ("id", "name", "keeper_id", "address", "place", "category", "starts_at", "ends_at", "is_face_to_face")


event_schema = EventSchema()
events_schema = EventSchema(many=True)