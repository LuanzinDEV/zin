package com.zin.platform.agent.domain.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class AgentToolId implements Serializable {

    @Column(name = "agent_version_id", nullable = false)
    private UUID agentVersionId;

    @Column(name = "tool_id", nullable = false)
    private UUID toolId;
}

