package consts

// AIEmployeePosition represents the position of an AI employee
type AIEmployeePosition string

const (
	// AIEmployeePositionEngineer represents a研发工程师
	AIEmployeePositionEngineer AIEmployeePosition = "研发工程师"

	// AIEmployeePositionProductManager represents a产品经理
	AIEmployeePositionProductManager AIEmployeePosition = "产品经理"

	// AIEmployeePositionTester represents a测试工程师
	AIEmployeePositionTester AIEmployeePosition = "测试工程师"
)

type RepoPlatform string

const (
	RepoPlatformGitHub RepoPlatform = "GitHub"
	RepoPlatformGitLab RepoPlatform = "GitLab"
	RepoPlatformGitee  RepoPlatform = "Gitee"
	RepoPlatformGitea  RepoPlatform = "Gitea"
)

type CreatedBy string

const (
	CreatedByAdmin CreatedBy = "admin"
	CreatedByUser  CreatedBy = "user"
)
