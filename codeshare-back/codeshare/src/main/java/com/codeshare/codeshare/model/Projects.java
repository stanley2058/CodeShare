package com.codeshare.codeshare.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection="Projects")
public class Projects {
    @Id
    public String id;
    @Field("UUID")
    public String UUID;
    @Field("shortCode")
    public String shortCode;
    @Field("author")
    public String author;
    @Field("language")
    public String language;
    @Field("isReadonly")
    public boolean isReadonly;
    @Field("body")
    public String body;
    @Field("comments")
    public Comment[] comments;
}
