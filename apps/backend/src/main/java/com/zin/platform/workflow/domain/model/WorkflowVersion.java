package com.zin.platform.workflow.domain.model;

import com.zin.platform.identity.domain.model.User;
import com.zin.platform.shared.domain.AuditableEntity;
import com.zin.platform.workflow.domain.enums.WorkflowVersionStatus;
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
import java.util.Map;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "workflow_versions", uniqueConstraints = @UniqueConstraint(name = "uk_workflow_versions_workflow_number", columnNames = {"workflow_id", "version_number"}))
public class WorkflowVersion extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;

    @Column(name = "version_number", nullable = false)
    private int versionNumber;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> definition = Map.of();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private WorkflowVersionStatus status = WorkflowVersionStatus.DRAFT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;

    @Column(name = "published_at")
    private Instant publishedAt;
}

