package com.sorveteria.SorveteriaAPI.repository;

import com.sorveteria.SorveteriaAPI.model.Sorvete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SorveteRepository extends JpaRepository<Sorvete, Long> {
}
