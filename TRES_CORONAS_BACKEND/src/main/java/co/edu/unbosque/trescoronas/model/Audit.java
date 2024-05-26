package co.edu.unbosque.trescoronas.model;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "audit")
public class Audit {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAudit;
    
    private String previousStateAudit;
    private Date dateAudit;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_employee")
    private Employee employee;

    // Getters and setters
    public int getIdAudit() {
        return idAudit;
    }

    public void setIdAudit(int idAudit) {
        this.idAudit = idAudit;
    }

    public String getPreviousStateAudit() {
        return previousStateAudit;
    }

    public void setPreviousStateAudit(String previousStateAudit) {
        this.previousStateAudit = previousStateAudit;
    }

    public Date getDateAudit() {
        return dateAudit;
    }

    public void setDateAudit(Date dateAudit) {
        this.dateAudit = dateAudit;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}