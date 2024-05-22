package com.digitalequb.contactapi.repository;

import com.digitalequb.contactapi.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, String> {
    Optional<Contact> findById(String id);

    List<Contact> searchAllByName(String name);
}
