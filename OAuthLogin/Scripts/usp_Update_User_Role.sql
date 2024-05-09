USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Update_User_Role]    Script Date: 09-05-2024 11:06:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[usp_Update_User_Role]
	-- Add the parameters for the stored procedure here
	@UserId NVARCHAR(450) = '',
	@RoleId NVARCHAR(450) =''
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE AspNetUserRoles
	SET RoleId = @RoleId WHERE UserId=@UserId

	select 1 as IsValid, 'Record Updated Successfully!' as Message
END
GO

