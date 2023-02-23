from flask import jsonify, json, request
from flask_restful import Resource, reqparse

import database

# ----------------------------------------------------------------------


class SpacesApi(Resource):
    def get(self, space_id=None):
        parser = reqparse.RequestParser()
        parser.add_argument("puid", type=str)
        args = parser.parse_args()

        if args["puid"]:
            data = database.get_user_spaces(args["puid"])
            return jsonify(data)

        if space_id is None:  # if space isn't specified, get all spaces
            data = database.get_spaces()
            return jsonify(data)

        data = database.get_details(space_id)
        return jsonify(data)

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("puid", type=str)
        parser.add_argument("name", type=str)
        parser.add_argument("capacity", type=int)
        parser.add_argument("location", type=str)
        parser.add_argument("type", type=str)
        parser.add_argument("images", type=str, action="append")

        args = parser.parse_args()
        status, space_id = database.add_space(
            args["puid"], args["name"], args["capacity"], args["location"], args["type"]
        )
        if not status:
            # return error message to frontend with existing space id
            return jsonify({"status": 409, "space_id": space_id})

        if args["images"]:
            for image in args["images"]:
                url = database.upload_photo_to_cloudinary(image)
                database.add_photo(space_id, url, None)
        return jsonify({"status": 200})

    def put(self, space_id):
        dict_of_changes = json.loads(request.data)
        return database.update_space(space_id, dict_of_changes)

    def delete(self, space_id):
        return database.remove_space(space_id)
