package com.zin.platform.agent.domain.model;

import com.zin.platform.agent.domain.enums.AgentVersionStatus;
import com.zin.platform.agent.domain.enums.MemoryStrategy;
import com.zin.platform.agent.domain.enums.ModelProvider;
import com.zin.platform.identity.domain.model.User;
import com.zin.platform.shared.domain.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import java.time.Instant;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "agent_versions", uniqueConstraints = @UniqueConstraint(name = "uk_agent_versions_agent_number", columnNames = {"agent_id", "version_number"}))
public class AgentVersion extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "agent_id", nullable = false)
    private Agent agent;

    @Column(name = "version_number", nullable = false)
    private int versionNumber;

    @Column(name = "system_prompt", nullable = false, columnDefinition = "text")
    private String systemPrompt;

    @Enumerated(EnumType.STRING)
    @Column(name = "model_provider", nullable = false, length = 32)
    private ModelProvider modelProvider;

    @Column(name = "model_name", nullable = false, length = 120)
    private String modelName;

    @Column(nullable = false)
    private Double temperature;

    @Column(name = "max_tokens")
    private Integer maxTokens;

    @Enumerated(EnumType.STRING)
    @Column(name = "memory_strategy", nullable = false, length = 32)
    private MemoryStrategy memoryStrategy = MemoryStrategy.NONE;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private AgentVersionStatus status = AgentVersionStatus.DRAFT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;

    @Column(name = "published_at")
    private Instant publishedAt;
}

