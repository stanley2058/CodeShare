package com.codeshare.codeshare.model;

import com.google.gson.Gson;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection="Projects")
public class Comment {
    @Field("commentString")
    public String commentString;
    @Field("username")
    public String username;
    @Field("timestamp")
    public long timestamp;

    public Comment() {}
    public Comment(String commentString, String username, long timestamp) {
        this.commentString = commentString;
        this.username = username;
        this.timestamp = timestamp;
    }

    @Override
    public String toString() {
        return new Gson().toJson(this);
    }
}
