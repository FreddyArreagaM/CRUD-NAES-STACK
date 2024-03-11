using Backend_API_NAES.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend_API_NAES
{

    public class AplicationDbContext: DbContext
    {

        // El objeto de configuración para la aplicación. Se utiliza para leer la configuración de diversas fuentes, como archivos JSON o variables de entorno.
        public IConfiguration _config { get; set; }


        // Constructor del contexto de la base de datos que recibe la configuración de la aplicación.
        public AplicationDbContext(IConfiguration config)
        {
            _config = config;
        }

        // Establece la configuración para conectar a la base de datos utilizando la cadena de conexión "DevConnection".
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("DevConnection"));
        }

        // Define un conjunto de entidades "TarjetaCredito" que se mapearán a una tabla en la base de datos.
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }

    }
}
