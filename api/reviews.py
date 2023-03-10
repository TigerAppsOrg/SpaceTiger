from flask import json, request, jsonify, session
from flask_restful import Resource, reqparse

import database

# ----------------------------------------------------------------------


class ReviewsApi(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument("space_id", type=int)
        parser.add_argument("user_id", type=str)
        args = parser.parse_args()

        data = database.get_reviews(space_id=args["space_id"], puid=args["user_id"])
        return jsonify(data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("space_id", type=int)
        parser.add_argument("puid", type=str)
        parser.add_argument("rating", type=int)
        parser.add_argument("content", type=str)
        parser.add_argument("noisiness", type=int)
        parser.add_argument("privacy", type=int)
        parser.add_argument("lighting", type=int)
        parser.add_argument("cleanliness", type=int)
        parser.add_argument("amenities_rating", type=int)
        parser.add_argument("tags", action="append", type=str)
        parser.add_argument("amenities", action="append", type=str)

        args = parser.parse_args()

        review_id = database.add_review(
            space_id=args["space_id"],
            puid=args["puid"],
            rating=args["rating"],
            content=args["content"],
            noisiness=args["noisiness"],
            privacy=args["privacy"],
            lighting=args["lighting"],
            cleanliness=args["cleanliness"],
            amenities_rating=args["amenities_rating"],
        )

        if args["amenities"]:
            for amenity in args["amenities"]:
                database.add_amenity(amenity=amenity, space_id=args["space_id"], review_id=review_id)

        if args["tags"]:
            for tag in args["tags"]:
                database.add_tag(tag=tag, space_id=None, review_id=review_id)

        database.update_space_from_review(
            space_id=args["space_id"],
            rating=args["rating"],
            noisiness=args["noisiness"],
            privacy=args["privacy"],
            lighting=args["lighting"],
            cleanliness=args["cleanliness"],
            amenities_rating=args["amenities_rating"],
            adding=True
        )

    def put(self, review_id):
        if "username" in session:
            user_id = session.get("username")

        dict_of_changes = json.loads(request.data)
        return database.update_review(review_id, user_id, dict_of_changes)

    def delete(self, review_id):
        if "username" in session:
            user_id = session.get("username")
        admin = database.check_user_admin()

        return database.remove_review(review_id, user_id, admin)
