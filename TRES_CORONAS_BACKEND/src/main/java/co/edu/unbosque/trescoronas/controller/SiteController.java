	package co.edu.unbosque.trescoronas.controller;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.edu.unbosque.trescoronas.model.Bar;
import co.edu.unbosque.trescoronas.model.Site;
import co.edu.unbosque.trescoronas.repository.SiteRepository;

@CrossOrigin
@RequestMapping("/Tres-Coronas-Bar/Bar/Site")
@RestController
public class SiteController {
    @Autowired
    private SiteRepository siteRepository;

    @GetMapping
    Iterable<Site> list() {
        return siteRepository.findAllWithBar();
    }

    @GetMapping("/{id}")
    ResponseEntity<Site> getSiteById(@PathVariable Integer id) {
        Optional<Site> site = siteRepository.findById(id);
        return site.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @GetMapping("/ByBar/{barId}")
    public ResponseEntity<List<Site>> getSitesByBarId(@PathVariable int barId) {
        try {
            List<Site> sites = siteRepository.findByBarId(barId);
            return new ResponseEntity<>(sites, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @PostMapping
    public ResponseEntity<Site> createSite(@RequestBody Map<String, Object> requestBody) {
        try {
            // Extraer los datos del objeto Bar del cuerpo de la solicitud
            Map<String, Object> barData = (Map<String, Object>) requestBody.get("bar");

            // Construir el objeto Bar
            Bar bar = new Bar();
            bar.setIdBar((Integer) barData.get("idBar"));
            bar.setNameBar((String) barData.get("nameBar"));
            bar.setAddressBar((String) barData.get("addressBar"));
            bar.setLocallyBar((String) barData.get("locallyBar"));

            // Construir el objeto Site con el objeto Bar
            Site site = new Site();
            site.setBar(bar);

            // Guardar el sitio en la base de datos
            Site savedSite = siteRepository.save(site);

            return new ResponseEntity<>(savedSite, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @DeleteMapping("/{id}")
	  public ResponseEntity<Void> deleteSite(@PathVariable("id") Integer id) {
	      try {
	          // Eliminar el bar
	          siteRepository.deleteById(id);
	          // Devolver una respuesta vacía con estado 204 (No Content)
	          return ResponseEntity.noContent().build();
	      } catch (EmptyResultDataAccessException e) {
	          // Si no se encuentra el bar, devolver estado 404 (Not Found)
	          return ResponseEntity.notFound().build();
	      } catch (Exception e) {
	          // En caso de cualquier otro error, devolver estado 500 (Internal Server Error)
	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
	      }
	  }


}
