# ECS Instance Outputs
output "compute_instance_ids" {
  value = huaweicloud_compute_instance.mycompute[*].id
  description = "The IDs of the ECS instances"
}

output "compute_instance_names" {
  value = huaweicloud_compute_instance.mycompute[*].name
  description = "The names of the ECS instances"
}

output "compute_instance_ip_addresses" {
  value = huaweicloud_compute_instance.mycompute[*].access_ip_v4
  description = "The public IPv4 addresses of the ECS instances"
}

# VPC Outputs
output "vpc_id" {
  value = huaweicloud_vpc.vpc_1.id
  description = "The ID of the VPC"
}

output "vpc_cidr_block" {
  value = huaweicloud_vpc.vpc_1.cidr
  description = "The CIDR block of the VPC"
}

# Subnet Outputs
output "subnet_id" {
  value = huaweicloud_vpc_subnet.subnet1.id
  description = "The ID of the subnet"
}

output "subnet_cidr_block" {
  value = huaweicloud_vpc_subnet.subnet1.cidr
  description = "The CIDR block of the subnet"
}

output "subnet_gateway_ip" {
  value = huaweicloud_vpc_subnet.subnet1.gateway_ip
  description = "The gateway IP of the subnet"
}

# RDS Instance Outputs
output "rds_instance_id" {
  value = huaweicloud_rds_instance.instance.id
  description = "The ID of the RDS instance"
}

output "rds_instance_name" {
  value = huaweicloud_rds_instance.instance.name
  description = "The name of the RDS instance"
}

output "rds_instance_flavor" {
  value = huaweicloud_rds_instance.instance.flavor
  description = "The flavor of the RDS instance"
}

output "rds_instance_volume_size" {
  value = huaweicloud_rds_instance.instance.volume[0].size
  description = "The size of the RDS instance volume"
}

output "rds_instance_password" {
  value = var.postgreSQL_password
  description = "The password for the PostgreSQL RDS instance"
}

# Availability Zones Outputs
output "availability_zones" {
  value = data.huaweicloud_availability_zones.myaz.names
  description = "The availability zones for the resources"
}

# Compute Flavor Outputs
output "compute_flavor_id" {
  value = data.huaweicloud_compute_flavors.myflavor.ids[0]
  description = "The flavor ID used for the ECS instances"
}

output "compute_flavor_cpu_cores" {
  value = data.huaweicloud_compute_flavors.myflavor.cpu_core_count
  description = "The number of CPU cores for the selected ECS flavor"
}

output "compute_flavor_memory_size" {
  value = data.huaweicloud_compute_flavors.myflavor.memory_size
  description = "The memory size (GB) for the selected ECS flavor"
}

# Image Outputs
output "image_id" {
  value = data.huaweicloud_images_image.myimage.id
  description = "The ID of the selected image"
}

output "image_name" {
  value = data.huaweicloud_images_image.myimage.name
  description = "The name of the selected image"
}
