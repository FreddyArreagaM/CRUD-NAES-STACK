using Backend_API_NAES;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Se debe agregar esta línea en el archivo cs principal llamado "Program.cs" para que funcione
//la conexión con la base de datos
builder.Services.AddScoped<AplicationDbContext>();

//Codigo adicional que permite hacer la petición desde el frontend
// es como para darles permiso de consumir a través del backend con destino a la base de datos
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularOrigins",
    builder =>
    {
        builder.WithOrigins(
                            "http://localhost:4200"
                            )
                            .AllowAnyHeader()
                            .AllowAnyMethod();
    });
});

var app = builder.Build();

//Codigo adicional que permite hacer la petición desde el frontend
// es como para darles permiso de consumir a través del backend con destino a la base de datos
app.UseCors("AllowAngularOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
