package com.sorveteria.SorveteriaAPI.controller;


import com.sorveteria.SorveteriaAPI.model.Venda;
import com.sorveteria.SorveteriaAPI.service.VendaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "http://localhost:4200")
public class VendaController {

    @Autowired
    VendaService vendaService;

    @PostMapping
    public Venda createVenda(@RequestBody Venda venda) {
       try {
           return vendaService.createVenda(venda);
       } finally {
           vendaService.updateEstoque(venda.getId());
       }
    }

    @GetMapping
    public Page<Venda> listALlVenda(@PageableDefault(size = 10) Pageable pageable){
        return vendaService.listALlVenda(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> findVendaById(@PathVariable Long id) {
        return vendaService.findVendaById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity updateVenda(@RequestBody Venda venda, @PathVariable Long id) {
        return vendaService.updateVenda(venda, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteVenda (@PathVariable Long id) {
        return vendaService.deleteVenda(id);
    }


}
