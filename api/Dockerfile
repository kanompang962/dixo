# ================================
# Build stage
# ================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy project file (อยู่ root)
COPY api.csproj ./

# Restore dependencies
RUN dotnet restore

# Copy everything else
COPY . ./

# Publish
RUN dotnet publish -c Release -o out

# ================================
# Runtime stage
# ================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Copy published output
COPY --from=build /app/out .

# Expose port 5000
EXPOSE 5000

# Set environment variables
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Run the application
ENTRYPOINT ["dotnet", "api.dll"]
