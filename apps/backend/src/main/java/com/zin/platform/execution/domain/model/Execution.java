package com.zin.platform.execution.domain.model;

import com.zin.platform.agent.domain.model.AgentVersion;
import com.zin.platform.execution.domain.enums.ExecutionStatus;
import com.zin.platform.execution.domain.enums.TriggerType;
import com.zin.platform.organization.domain.model.Organization;
import com.zin.platform.shared.domain.CreatedEntity;
import com.zin.platform.workflow.domain.model.WorkflowVersion;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "executions")
public class Execution extends CreatedEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "workflow_version_id")
    private WorkflowVersion workflowVersion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_version_id")
    private AgentVersion agentVersion;

    @Enumerated(EnumType.STRING)
    @Column(name = "trigger_type", nullable = false, length = 32)
    private TriggerType triggerType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private ExecutionStatus status = ExecutionStatus.QUEUED;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "input", columnDefinition = "jsonb")
    private Map<String, Object> input;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "output", columnDefinition = "jsonb")
    private Map<String, Object> output;

    @Column(name = "error_message", columnDefinition = "text")
    private String errorMessage;

    @Column(name = "trace_id", length = 120)
    private String traceId;

    @Column(name = "started_at")
    private Instant startedAt;

    @Column(name = "finished_at")
    private Instant finishedAt;
}

