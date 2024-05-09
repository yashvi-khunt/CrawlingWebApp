USE [OAuthLoginDb]
GO

/****** Object:  StoredProcedure [dbo].[usp_Get_Respone_For_JobId]    Script Date: 09-05-2024 11:05:25 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Get_Respone_For_JobId]
-- Add the parameters for the stored procedure here
	@JobId int  
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--declare @JobId int = 1
	select max(paramOrder) as count from JobResponses jr
	inner join JobParameters jp
	on jp.Id = jr.JobParameterId
	where JobId = @JobId

    -- Insert statements for procedure here
	select ParameterName,Value,ParamOrder from JobResponses jr
		inner join JobParameters jp
		on jr.JobParameterId = jp.Id
		where JobId = @JobId
		order by ParamOrder
END
GO

