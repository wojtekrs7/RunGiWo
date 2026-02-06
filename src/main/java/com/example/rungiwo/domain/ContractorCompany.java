package com.example.rungiwo.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "contractors")
public class ContractorCompany {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String nip;
    private String email;
    private String phone;


    protected ContractorCompany() {}

    public ContractorCompany(String name, String nip, String email, String phone) {
        this.name = name;
        this.nip = nip;
        this.email = email;
        this.phone = phone;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getNip() { return nip; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }

    public void setName(String name) { this.name = name; }
    public void setNip(String nip) { this.nip = nip; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone;}
}
