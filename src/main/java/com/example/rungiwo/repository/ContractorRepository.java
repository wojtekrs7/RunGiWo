package com.example.rungiwo.repository;

import com.example.rungiwo.domain.ContractorCompany;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContractorRepository extends JpaRepository<ContractorCompany, Long> {}
