package com.digitalequb.contactapi.config;

import com.digitalequb.contactapi.config.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.digitalequb.contactapi.model.Permission.*;
import static com.digitalequb.contactapi.model.Role.ADMIN;
import static com.digitalequb.contactapi.model.Role.SUBSCRIBER;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

    private static final String[] WHITE_LIST_URL = {
            "/api/v1/auth/**",
            "/api/v1/contacts/**"
    };
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req ->
                        req.requestMatchers(WHITE_LIST_URL)
                                .permitAll()
                                .requestMatchers("/api/v1/contacts/**").hasAnyRole(ADMIN.name(), SUBSCRIBER.name())
                                .requestMatchers(GET, "/api/v1/contacts/**").hasAnyAuthority(ADMIN_READ.name(), SUBSCRIBER_READ.name())
                                .requestMatchers(POST, "/api/v1/contacts/**").hasAnyAuthority(ADMIN_CREATE.name(), SUBSCRIBER_CREATE.name())
                                .requestMatchers(PUT, "/api/v1/contacts/**").hasAnyAuthority(ADMIN_UPDATE.name(), SUBSCRIBER_UPDATE.name())
                                .requestMatchers(DELETE, "/api/v1/contacts/**").hasAnyAuthority(ADMIN_DELETE.name(), SUBSCRIBER_DELETE.name())
                                .anyRequest()
                                .authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
        ;

        return http.build();
    }
}