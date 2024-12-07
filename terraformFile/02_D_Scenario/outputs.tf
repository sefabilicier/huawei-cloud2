// auto_scaling.tf

// Auto Scaling Configuration ID
output "my_as_config_id" {
  value = huaweicloud_as_configuration.my_as_config.id
  description = "ID of the Auto Scaling Configuration"
}

// Auto Scaling Group ID
output "my_as_group_id" {
  value = huaweicloud_as_group.my_as_group.id
  description = "ID of the Auto Scaling Group"
}

// Scaling Up Alarm Rule ID
output "scaling_up_alarm_id" {
  value = huaweicloud_ces_alarmrule.scaling_up_rule.id
  description = "ID of the Scaling Up Alarm Rule"
}

// Scaling Down Alarm Rule ID
output "scaling_down_alarm_id" {
  value = huaweicloud_ces_alarmrule.scaling_down_rule.id
  description = "ID of the Scaling Down Alarm Rule"
}

// Scaling Up Policy ID
output "scaling_up_policy_id" {
  value = huaweicloud_as_policy.scaling_up_policy.id
  description = "ID of the Scaling Up Policy"
}

// Scaling Down Policy ID
output "scaling_down_policy_id" {
  value = huaweicloud_as_policy.scaling_down_policy.id
  description = "ID of the Scaling Down Policy"
}



// ecs.tf

// ECS Compute Instance ID
output "mycompute_instance_id" {
  value = huaweicloud_compute_instance.mycompute.id
  description = "ID of the ECS Compute Instance"
}

// ECS Compute Instance Public IP
output "mycompute_instance_ip" {
  value = huaweicloud_compute_instance.mycompute.access_ip_v4
  description = "Public IP of the ECS Compute Instance"
}



// rds.tf

// RDS Instance ID
output "rds_instance_id" {
  value = huaweicloud_rds_instance.instance.id
  description = "ID of the RDS Instance"
}

// RDS Instance Endpoint (For connecting to the database)
output "rds_instance_endpoint" {
  value = huaweicloud_rds_instance.instance.id
  description = "Endpoint of the RDS Instance"
}

// RDS Instance Volume Size
output "rds_instance_volume_size" {
  value = huaweicloud_rds_instance.instance.volume[0].size
  description = "Volume size of the RDS instance"
}



// vpc.tf & subnet.tf

// VPC ID
output "vpc_id" {
  value = huaweicloud_vpc.vpc_1.id
  description = "ID of the VPC"
}

// Subnet ID
output "subnet_id" {
  value = huaweicloud_vpc_subnet.subnet1.id
  description = "ID of the Subnet"
}

// Subnet CIDR Block
output "subnet_cidr" {
  value = huaweicloud_vpc_subnet.subnet1.cidr
  description = "CIDR block of the Subnet"
}

// Subnet Gateway IP
output "subnet_gateway_ip" {
  value = huaweicloud_vpc_subnet.subnet1.gateway_ip
  description = "Gateway IP of the Subnet"
}



// vpc.tf

// Security Group ID
output "secgroup_id" {
  value = data.huaweicloud_networking_secgroup.mysecgroup.id
  description = "ID of the Security Group"
}

// Security Group Name
output "secgroup_name" {
  value = data.huaweicloud_networking_secgroup.mysecgroup.name
  description = "Name of the Security Group"
}

// Existing Security Group Rules
output "existing_security_group_rules" {
  value = data.huaweicloud_networking_secgroup_rules.existing_rules.rules
  description = "Existing rules of the Security Group"
}