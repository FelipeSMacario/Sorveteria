package com.sorveteria.SorveteriaAPI.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table(name = "sorvete")
@Entity
public class Sorvete {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @ManyToMany
    private List<Sabores> sabores = new ArrayList<>();

    @Column(name = "quantidadeEstoque")
    private  int quantidadeEstoque;

    @Column(name = "valor")
    private double valor;

    @Column(name = "valorFabrica")
    private double valorFabrica;

    @Column(name = "dtCompra")
    private LocalDateTime dtCompra;

    @Column(name = "dtValidade")
    private LocalDateTime dtValidade;

    @ManyToOne
    private Fabricante fabricante;

    public void testeEstoque(){
        setQuantidadeEstoque( getQuantidadeEstoque() - 2);
    }

}
