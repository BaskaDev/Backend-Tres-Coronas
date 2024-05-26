package co.edu.unbosque.trescoronas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "bar")
public class Bar {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idBar;
    
    private String nameBar;
    private String addressBar;
    private String locallyBar;

    // Getters and setters
    public int getIdBar() {
        return idBar;
    }

    public void setIdBar(int idBar) {
        this.idBar = idBar;
    }

    public String getNameBar() {
        return nameBar;
    }

    public void setNameBar(String nameBar) {
        this.nameBar = nameBar;
    }

    public String getAddressBar() {
        return addressBar;
    }

    public void setAddressBar(String addressBar) {
        this.addressBar = addressBar;
    }

    public String getLocallyBar() {
        return locallyBar;
    }

    public void setLocallyBar(String locallyBar) {
        this.locallyBar = locallyBar;
    }
}