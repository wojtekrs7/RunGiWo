package com.example.rungiwo.service;

import com.example.rungiwo.domain.ContractorCompany;
import com.example.rungiwo.dto.*;
import com.example.rungiwo.exception.NotFoundException;
import com.example.rungiwo.repository.ContractorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractorService {

    private final ContractorRepository repo;

    public ContractorService(ContractorRepository repo) {
        this.repo = repo;
    }

    public ContractorResponse create(CreateContractorRequest req) {
        ContractorCompany saved = repo.save(
                new ContractorCompany(req.name(), req.nip(), req.email(), req.phone())
        );
        return toResponse(saved);
    }

    public List<ContractorResponse> list() {
        return repo.findAll().stream().map(this::toResponse).toList();
    }

    public ContractorResponse get(Long id) {
        return toResponse(getEntity(id));
    }

    public void delete(Long id) {
        repo.delete(getEntity(id));
    }

    public ContractorResponse update(Long id, UpdateContractorRequest req) {
        ContractorCompany c = getEntity(id);

        c.setName(req.name());
        c.setNip(req.nip());
        c.setEmail(req.email());
        c.setPhone(req.phone());

        ContractorCompany saved = repo.save(c);
        return toResponse(saved);
    }

    public ContractorCompany getEntity(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Contractor not found: " + id));
    }

    private ContractorResponse toResponse(ContractorCompany c) {
        return new ContractorResponse(
                c.getId(),
                c.getName(),
                c.getNip(),
                c.getEmail(),
                c.getPhone()
        );
    }
}
