package com.sorveteria.SorveteriaAPI.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table
public class Sabores {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome", nullable = false)
    private String nome;
}
