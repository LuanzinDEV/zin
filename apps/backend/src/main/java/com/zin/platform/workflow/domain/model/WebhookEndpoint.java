package com.zin.platform.workflow.domain.model;

import com.zin.platform.identity.domain.model.User;
import com.zin.platform.organization.domain.model.Organization;
import com.zin.platform.shared.domain.AuditableEntity;
import com.zin.platform.workflow.domain.enums.WebhookStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "webhook_endpoints", uniqueConstraints = @UniqueConstraint(name = "uk_webhook_endpoints_org_slug", columnNames = {"organization_id", "slug"}))
public class WebhookEndpoint extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "workflow_id", nullable = false)
    private Workflow workflow;

    @Column(nullable = false, length = 160)
    private String name;

    @Column(nullable = false, length = 120)
    private String slug;

    @Column(name = "secret_hash", nullable = false, length = 255)
    private String secretHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private WebhookStatus status = WebhookStatus.ACTIVE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_user_id")
    private User createdByUser;
}

