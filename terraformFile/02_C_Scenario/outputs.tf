output "availability_zone" {
  description = "The availability zone used for ECS and RDS instances"
  value       = data.huaweicloud_availability_zones.myaz.names[0]
}

output "ecs_instance_id" {
  description = "The ID of the ECS instance"
  value       = huaweicloud_compute_instance.mycompute.id
}

output "ecs_instance_name" {
  description = "The name of the ECS instance"
  value       = huaweicloud_compute_instance.mycompute.name
}

output "ecs_instance_ip" {
  description = "The public IP of the ECS instance"
  value       = huaweicloud_compute_instance.mycompute.access_ip_v4
}

output "rds_instance_id" {
  description = "The ID of the RDS instance"
  value       = huaweicloud_rds_instance.instance.id
}

output "rds_instance_name" {
  description = "The name of the RDS instance"
  value       = huaweicloud_rds_instance.instance.name
}

output "rds_instance_password" {
  description = "The password used for the RDS instance"
  value       = var.postgreSQL_password
}

output "vpc_id" {
  description = "The ID of the VPC"
  value       = huaweicloud_vpc.vpc_1.id
}

output "subnet_ids" {
  description = "The IDs of the subnets created"
  value       = [
    huaweicloud_vpc_subnet.subnet1.id,
    huaweicloud_vpc_subnet.private_subnet.id,
    huaweicloud_vpc_subnet.public_subnet.id
  ]
}

output "secgroup_id" {
  description = "The ID of the security group"
  value       = huaweicloud_networking_secgroup.mysecgroup.id
}

output "secgroup_name" {
  description = "The name of the security group"
  value       = huaweicloud_networking_secgroup.mysecgroup.name
}

output "secgroup_rules" {
  description = "The rules associated with the security group"
  value = {
    ssh     = huaweicloud_networking_secgroup_rule.ssh.id
    postgresql = huaweicloud_networking_secgroup_rule.postgresql.id
    http    = huaweicloud_networking_secgroup_rule.http.id
    https   = huaweicloud_networking_secgroup_rule.https.id
  }
}

output "rds_db_type" {
  description = "The type of database used for the RDS instance"
  value       = huaweicloud_rds_instance.instance.db[0].type
}

output "rds_db_version" {
  description = "The version of the PostgreSQL database for the RDS instance"
  value       = huaweicloud_rds_instance.instance.db[0].version
}

output "rds_volume_size" {
  description = "The size of the RDS volume in GB"
  value       = huaweicloud_rds_instance.instance.volume[0].size
}

output "vpc_cidr" {
  description = "The CIDR block of the VPC"
  value       = huaweicloud_vpc.vpc_1.cidr
}
