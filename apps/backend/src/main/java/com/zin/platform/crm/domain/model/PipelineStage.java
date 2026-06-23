package com.zin.platform.crm.domain.model;

import com.zin.platform.shared.domain.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(
    name = "pipeline_stages",
    uniqueConstraints = @UniqueConstraint(name = "uk_pipeline_stages_pipeline_position", columnNames = {"pipeline_id", "position"})
)
public class PipelineStage extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "pipeline_id", nullable = false)
    private Pipeline pipeline;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false)
    private int position;

    @Column(length = 32)
    private String color;

    @Column(nullable = false)
    private int probability;
}

