# ECS Compute Instance Outputs
output "compute_instance_name" {
  value = huaweicloud_compute_instance.mycompute.name
  description = "The name of the ECS compute instance"
}

output "compute_instance_id" {
  value = huaweicloud_compute_instance.mycompute.id
  description = "The ID of the ECS compute instance"
}

output "compute_instance_flavor" {
  value = data.huaweicloud_compute_flavors.myflavor.ids[0]
  description = "The flavor ID used for the ECS instance"
}

output "compute_instance_image" {
  value = data.huaweicloud_images_image.myimage.id
  description = "The ID of the image used for the ECS instance"
}

output "compute_instance_availability_zone" {
  value = huaweicloud_compute_instance.mycompute.availability_zone
  description = "The availability zone where the ECS instance is located"
}

output "compute_instance_security_group" {
  value = huaweicloud_compute_instance.mycompute.security_group_ids
  description = "The security group IDs associated with the ECS instance"
}

output "compute_instance_network_uuid" {
  value = huaweicloud_compute_instance.mycompute.network[0].uuid
  description = "The network UUID associated with the ECS instance"
}


# VPC Outputs
output "vpc_id" {
  value = huaweicloud_vpc.vpc_1.id
  description = "The ID of the created VPC"
}

output "vpc_cidr_block" {
  value = huaweicloud_vpc.vpc_1.cidr
  description = "The CIDR block of the created VPC"
}


# Subnet Outputs
output "subnet_id" {
  value = huaweicloud_vpc_subnet.subnet1.id
  description = "The ID of the created subnet"
}

output "subnet_cidr_block" {
  value = huaweicloud_vpc_subnet.subnet1.cidr
  description = "The CIDR block of the created subnet"
}

output "subnet_gateway_ip" {
  value = huaweicloud_vpc_subnet.subnet1.gateway_ip
  description = "The gateway IP of the created subnet"
}


# RDS Instance Outputs
output "rds_instance_name" {
  value = huaweicloud_rds_instance.instance.name
  description = "The name of the created RDS instance"
}

output "rds_instance_id" {
  value = huaweicloud_rds_instance.instance.id
  description = "The ID of the created RDS instance"
}

output "rds_instance_flavor" {
  value = huaweicloud_rds_instance.instance.flavor
  description = "The flavor used for the RDS instance"
}

output "rds_instance_vpc_id" {
  value = huaweicloud_rds_instance.instance.vpc_id
  description = "The VPC ID where the RDS instance is deployed"
}

output "rds_instance_subnet_id" {
  value = huaweicloud_rds_instance.instance.subnet_id
  description = "The subnet ID where the RDS instance is deployed"
}

output "rds_instance_db_type" {
  value = huaweicloud_rds_instance.instance.db[0].type
  description = "The database type of the RDS instance (e.g., PostgreSQL)"
}

output "rds_instance_db_version" {
  value = huaweicloud_rds_instance.instance.db[0].version
  description = "The version of the database in the RDS instance"
}

output "rds_instance_backup_strategy" {
  value = huaweicloud_rds_instance.instance.backup_strategy[0].start_time
  description = "The backup strategy start time for the RDS instance"
}

output "rds_instance_volume_size" {
  value = huaweicloud_rds_instance.instance.volume[0].size
  description = "The size of the storage volume for the RDS instance"
}


# Availability Zone Outputs
output "availability_zone" {
  value = data.huaweicloud_availability_zones.myaz.names[0]
  description = "The availability zone selected for the ECS and RDS instances"
}

# Security Group Outputs
output "security_group_id" {
  value = data.huaweicloud_networking_secgroup.mysecgroup.id
  description = "The ID of the security group used for instances"
}

output "security_group_name" {
  value = data.huaweicloud_networking_secgroup.mysecgroup.name
  description = "The name of the security group used for instances"
}
