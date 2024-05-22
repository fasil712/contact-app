package com.digitalequb.contactapi.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Permission {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    SUBSCRIBER_READ("subscriber:read"),
    SUBSCRIBER_UPDATE("subscriber:update"),
    SUBSCRIBER_CREATE("subscriber:create"),
    SUBSCRIBER_DELETE("subscriber:delete")
    ;

    private final String permission;
}