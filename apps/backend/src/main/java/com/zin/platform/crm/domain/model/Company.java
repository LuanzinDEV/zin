package com.zin.platform.crm.domain.model;

import com.zin.platform.crm.domain.enums.CompanyStatus;
import com.zin.platform.identity.domain.model.User;
import com.zin.platform.organization.domain.model.Organization;
import com.zin.platform.shared.domain.AuditableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "companies")
public class Company extends AuditableEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "organization_id", nullable = false)
    private Organization organization;

    @Column(nullable = false, length = 180)
    private String name;

    @Column(name = "legal_name", length = 220)
    private String legalName;

    @Column(length = 64)
    private String document;

    @Column(length = 255)
    private String website;

    @Column(length = 120)
    private String industry;

    @Column(name = "company_size", length = 64)
    private String companySize;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_user_id")
    private User ownerUser;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 32)
    private CompanyStatus status = CompanyStatus.PROSPECT;
}

