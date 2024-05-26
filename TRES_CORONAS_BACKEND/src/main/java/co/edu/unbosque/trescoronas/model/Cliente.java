package co.edu.unbosque.trescoronas.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cliente")
public class Cliente {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_client;
    private String name_client;
    private String user_client;
    private String pass_client;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_gang")
    private Gang gang;
    
    @ManyToOne
    @JoinColumn(name = "fk_id_status")
    private StatusClient statusClient;



	public int getId_client() {
		return id_client;
	}

	public void setId_client(int id_client) {
		this.id_client = id_client;
	}

	public String getName_client() {
		return name_client;
	}

	public void setName_client(String name_client) {
		this.name_client = name_client;
	}

	public String getUser_client() {
		return user_client;
	}

	public void setUser_client(String user_client) {
		this.user_client = user_client;
	}

	public String getPass_client() {
		return pass_client;
	}

	public void setPass_client(String pass_client) {
		this.pass_client = pass_client;
	}

	public Gang getGang() {
		return gang;
	}

	public void setGang(Gang gang) {
		this.gang = gang;
	}

	public StatusClient getStatusClient() {
		return statusClient;
	}

	public void setStatusClient(StatusClient statusClient) {
		this.statusClient = statusClient;
	}

    
}
