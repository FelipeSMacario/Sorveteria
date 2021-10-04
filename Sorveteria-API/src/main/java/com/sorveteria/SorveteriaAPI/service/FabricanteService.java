package com.sorveteria.SorveteriaAPI.service;

import com.sorveteria.SorveteriaAPI.model.Fabricante;
import com.sorveteria.SorveteriaAPI.repository.FabricanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class FabricanteService {
    @Autowired
    FabricanteRepository fabricanteRepository;

    public Fabricante createFabricante(Fabricante fabricante) {
        return fabricanteRepository.save(fabricante);
    }

    public List<Fabricante> findAll() {
        return fabricanteRepository.findAll();
    }

    public List<Fabricante> findByNome(String nome) {return fabricanteRepository.findByNomeContaining(nome);}

    public ResponseEntity<Fabricante> findById(Long id) {
        return fabricanteRepository.findById(id)
                .map(record -> ResponseEntity.ok().body(record))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity updateFabricante(Fabricante fabricante, Long id) {
        return fabricanteRepository.findById(id)
                .map(fabricante1 -> {
                    fabricante1.setNome(fabricante.getNome());
                    fabricante1.setContato(fabricante.getContato());

                    Fabricante fabri = fabricanteRepository.save(fabricante1);
                    return ResponseEntity.ok().body(fabri);
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity deleteFabricante(Long id) {
        return fabricanteRepository.findById(id)
                                    .map(record -> {
                                        fabricanteRepository.deleteById(id);
                                        return ResponseEntity.ok().build();
                                    })
                                    .orElse( ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }
}
