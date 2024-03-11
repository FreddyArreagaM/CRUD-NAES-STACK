using Backend_API_NAES.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend_API_NAES.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        /* --- METODOS CRUD --- */
        
        
        //Declaramos una variable de lectura privada
        private readonly AplicationDbContext _context;

        
        //Declaramos un metodo para vincular el contexto
        public TarjetaController(AplicationDbContext context){
            _context = context;
        }


        //Metodo para obtener lista de tarjetas de la base de datos.
        // GET: api/<TarjetaController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                //creamos una variable para almacenar la lista de tarjetas a leer de la base de datos
                //Asignamos a travez del contexto y por medio del metodo "ToListAsync()" obtenemos la lista de la tabla correspondiente
                var listTarjetas = await _context.TarjetaCredito.ToListAsync();
                return Ok(listTarjetas);
            }
            catch(Exception ex){
                return BadRequest(ex.Message);
            }
        }

        /*
        // GET api/<TarjetaController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }*/


        //Metodo para agregar una nueva tarjeta por el metodo POST
        // POST api/<TarjetaController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                _context.Add(tarjeta);
                await _context.SaveChangesAsync();
                return Ok(tarjeta);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        //Metodo para actualizar Trajeta por ID
        // PUT api/<TarjetaController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] TarjetaCredito tarjeta)
        {
            try
            {
                //Validamos si el id que llega es correcto a la tarjeta o no
                if(id != tarjeta.Id)
                {
                    return NotFound();
                }
                //En caso de que sea correcto realiza lo siguiente
                else
                {
                    //Metodos llamados del contexto para actualizar los datos de una tarjeta
                    _context.Update(tarjeta);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "La tarjeta fue actualizada con exito!" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        //Metodo para eliminar Tarjeta por ID
        // DELETE api/<TarjetaController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                //Declaramos una variable que retorne si se encuentra dicho id o no
                var IDtarjeta = await _context.TarjetaCredito.FindAsync(id);

                //Validamos si no se ha encontrado dicho id
                if(IDtarjeta == null)
                {
                    return NotFound();
                }
                //En caso de que si se encuentre el id se realizae el metodo para eliminar
                else
                {
                    _context.TarjetaCredito.Remove(IDtarjeta);
                    await _context.SaveChangesAsync();
                    return Ok(new { message = "La tarjeta fue eliminada con exito" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
