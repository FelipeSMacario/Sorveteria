package com.sorveteria.SorveteriaAPI.controller;

import com.sorveteria.SorveteriaAPI.model.Fabricante;
import com.sorveteria.SorveteriaAPI.service.FabricanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/fabricante")
@CrossOrigin(origins = "http://localhost:4200")
public class FabricanteController {

    @Autowired
    FabricanteService fabricanteService;

    @PostMapping
    public Fabricante createFabricante(@RequestBody Fabricante fabricante) {
        return fabricanteService.createFabricante(fabricante);
    }

    @GetMapping
    public List<Fabricante> TodosFabricantes() {
        return fabricanteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fabricante> umFabricante(@Valid @PathVariable Long id) {
        return fabricanteService.findById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity atualizaFabricante(@RequestBody Fabricante fabricante, @PathVariable Long id) {
        return fabricanteService.updateFabricante(fabricante, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Fabricante> deletaFabricante(@PathVariable Long id) {
        return fabricanteService.deleteFabricante(id);
    }
}
