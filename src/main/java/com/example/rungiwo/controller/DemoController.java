package com.example.rungiwo.controller;

import com.example.rungiwo.dto.CreateBuildingRequest;
import com.example.rungiwo.dto.CreateContractorRequest;
import com.example.rungiwo.service.BuildingService;
import com.example.rungiwo.service.ContractorService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DemoController {

    private final BuildingService buildingService;
    private final ContractorService contractorService;

    public DemoController(BuildingService buildingService,
                          ContractorService contractorService) {
        this.buildingService = buildingService;
        this.contractorService = contractorService;
    }

    @GetMapping("/demo/create")
    public String createDemo() {

        buildingService.create(
                new CreateBuildingRequest("Budynek A", "Testowa 1")
        );

        contractorService.create(
                new CreateContractorRequest(
                        "Elektryk Sp. z o.o.",
                        "123",
                        "a@a.pl",
                        "111-222-333"
                )
        );

        return "redirect:/index.html";
    }
}
