USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Add_Login_Histories]    Script Date: 09-05-2024 11:04:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [dbo].[usp_Add_Login_Histories]
	-- Add the parameters for the stored procedure here
	@UserId nvarchar(450),
	@DateTime datetime2(7),
	@IpAddress nvarchar(max),
	@Browser nvarchar(max) = NULL,
	@OS nvarchar(max) = NULL,
	@Device nvarchar(max) = NULL
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	DECLARE @isValid BIT = 1 

    -- Insert statements for procedure here
	IF @Browser = '' begin set @Browser = NULL end
	IF @OS= '' begin set @OS = NULL end
	IF @Device = '' begin set @Device = NULL end

	IF @isValid=1 
	BEGIN
		insert into LoginHistories(UserId,DateTime,IpAddress,Browser,OS,Device) values(@UserId,@DateTime,@IpAddress,@Browser,@OS,@Device)
	END

	select @isValid as IsValid, 'Login History added successfully.' as Message
END
GO

