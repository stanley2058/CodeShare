package com.codeshare.codeshare.model;

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
}
