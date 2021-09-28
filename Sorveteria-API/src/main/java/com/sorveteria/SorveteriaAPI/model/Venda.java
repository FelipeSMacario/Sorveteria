package com.sorveteria.SorveteriaAPI.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Optional;

@Data
@Entity
@Table(name = "venda")
public class Venda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Sorvete sorvete;

    @Column(name = "qtdItemVenda")
    private int qtdItemVenda;

    @Column(name = "qtdValorVenda")
    private double qtdValorVenda;

    @ManyToOne
    private Sabores sabores;


}
