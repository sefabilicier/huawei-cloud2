// Outputs for VPC resources
output "vpc_id" {
  value       = huaweicloud_vpc.vpc_1.id
  description = "The ID of the VPC"
}

output "vpc_cidr" {
  value       = huaweicloud_vpc.vpc_1.cidr
  description = "The CIDR block of the VPC"
}

// Outputs for Subnet resources
output "subnet_web_id" {
  value       = huaweicloud_vpc_subnet.subnet1.id
  description = "The ID of the web subnet"
}

output "subnet_web_cidr" {
  value       = huaweicloud_vpc_subnet.subnet1.cidr
  description = "The CIDR block of the web subnet"
}

output "subnet_web_gateway_ip" {
  value       = huaweicloud_vpc_subnet.subnet1.gateway_ip
  description = "The gateway IP of the web subnet"
}

output "public_subnet_id" {
  value       = huaweicloud_vpc_subnet.public_subnet.id
  description = "The ID of the public subnet"
}

output "private_subnet_id" {
  value       = huaweicloud_vpc_subnet.private_subnet.id
  description = "The ID of the private subnet"
}

output "public_subnet_cidr" {
  value       = huaweicloud_vpc_subnet.public_subnet.cidr
  description = "The CIDR block of the public subnet"
}

output "private_subnet_cidr" {
  value       = huaweicloud_vpc_subnet.private_subnet.cidr
  description = "The CIDR block of the private subnet"
}

// Outputs for ECS resources
output "compute_instance_id" {
  value       = huaweicloud_compute_instance.mycompute.id
  description = "The ID of the ECS instance"
}

output "compute_instance_name" {
  value       = huaweicloud_compute_instance.mycompute.name
  description = "The name of the ECS instance"
}

output "compute_instance_image" {
  value       = data.huaweicloud_images_image.myimage.name
  description = "The image used for the ECS instance"
}

output "compute_instance_flavor" {
  value       = huaweicloud_compute_instance.mycompute.flavor_id
  description = "The flavor of the ECS instance"
}

output "compute_instance_security_group" {
  value       = huaweicloud_compute_instance.mycompute.security_group_ids
  description = "The security group IDs assigned to the ECS instance"
}

// Outputs for NAT Gateway resources
output "nat_gateway_id" {
  value       = huaweicloud_nat_gateway.nat_gateway.id
  description = "The ID of the NAT Gateway"
}

output "nat_gateway_name" {
  value       = huaweicloud_nat_gateway.nat_gateway.name
  description = "The name of the NAT Gateway"
}

// Outputs for RDS resources
output "rds_instance_id" {
  value       = huaweicloud_rds_instance.instance.id
  description = "The ID of the RDS instance"
}

output "rds_instance_name" {
  value       = huaweicloud_rds_instance.instance.name
  description = "The name of the RDS instance"
}

output "rds_instance_flavor" {
  value       = huaweicloud_rds_instance.instance.flavor
  description = "The flavor of the RDS instance"
}

output "rds_instance_password" {
  value       = var.postgreSQL_password
  description = "The password for the PostgreSQL RDS instance"
}

output "rds_instance_db_version" {
  value       = huaweicloud_rds_instance.instance.db[0].version
  description = "The version of the PostgreSQL RDS instance"
}

output "rds_instance_volume_size" {
  value       = huaweicloud_rds_instance.instance.volume[0].size
  description = "The volume size of the RDS instance in GB"
}

output "rds_instance_backup_start_time" {
  value       = huaweicloud_rds_instance.instance.backup_strategy[0].start_time
  description = "The backup start time for the RDS instance"
}

// Outputs for Security Group resources
output "secgroup_id" {
  value       = data.huaweicloud_networking_secgroup.mysecgroup.id
  description = "The ID of the security group"
}

output "secgroup_name" {
  value       = data.huaweicloud_networking_secgroup.mysecgroup.name
  description = "The name of the security group"
}

output "secgroup_description" {
  value       = data.huaweicloud_networking_secgroup.mysecgroup.description
  description = "The description of the security group"
}