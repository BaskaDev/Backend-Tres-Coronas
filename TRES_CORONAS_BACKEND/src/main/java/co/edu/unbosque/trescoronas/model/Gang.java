package co.edu.unbosque.trescoronas.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "gang")
public class Gang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idGang;

    private String nameGang;
    private int numberMembersGang;

    @ManyToOne
    @JoinColumn(name = "fk_id_site")
    private Site site;

    // Getters and setters
    public int getIdGang() {
        return idGang;
    }

    public void setIdGang(int idGang) {
        this.idGang = idGang;
    }

    public String getNameGang() {
        return nameGang;
    }

    public void setNameGang(String nameGang) {
        this.nameGang = nameGang;
    }


    public int getNumberMembersGang() {
        return numberMembersGang;
    }

    public void setNumberMembersGang(int numberMembersGang) {
        this.numberMembersGang = numberMembersGang;
    }

    public Site getSite() {
        return site;
    }

    public void setSite(Site site) {
        this.site = site;
    }
}
