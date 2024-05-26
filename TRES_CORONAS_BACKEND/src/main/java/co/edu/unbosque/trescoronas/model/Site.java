package co.edu.unbosque.trescoronas.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "site")
public class Site {
    
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSite;

    @ManyToOne
    @JoinColumn(name = "fk_id_bar")
    private Bar bar;

    // Getters and setters
    public int getIdSite() {
        return idSite;
    }

    public void setIdSite(int idSite) {
        this.idSite = idSite;
    }

    public Bar getBar() {
        return bar;
    }

    public void setBar(Bar bar) {
        this.bar = bar;
    }
}